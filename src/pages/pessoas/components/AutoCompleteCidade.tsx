import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
    id: number;
    label: string;
};

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({isExternalLoading = false}) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');  
  const {debounce} = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  },[registerField, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca, selectedId?.toString())
        .then((result) => {
          setIsLoading(false);
          
          if(result instanceof Error) {
            // alert(result.message);
          } else {
            console.log(result);
            
            setOptions(result.data.map(cidade => ({id: cidade.id, label: cidade.nome})));
          }
        });
    });
  }, [busca, selectedId]);


  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return  null;
    
    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedOption) return  null;

    return selectedOption;
  },[selectedId, options]);

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal     

      value={autoCompleteSelectedOption}
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28}/> : undefined} 
      onChange={(_, newValue)=> { setSelectedId(newValue?.id); setBusca(''); clearError();}}
      onInputChange={(_, newValue) => setBusca(newValue)}
      
      renderInput={(params) => (
        <TextField
          {...params}
          label='Cidade'
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
