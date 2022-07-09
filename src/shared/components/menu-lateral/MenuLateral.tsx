import { Avatar, Divider, Drawer, Icon, List, ListItemIcon, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppDrawerContext, useAppThemeContext, useAuthContext } from '../../contexts';

interface IMenuLateralProp {
  children?: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
  
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton  selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateralProp> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();
  const { logout } = useAuthContext();
  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="data:image/jpeg;base64,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"
            />
          </Box>

          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>{ themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
