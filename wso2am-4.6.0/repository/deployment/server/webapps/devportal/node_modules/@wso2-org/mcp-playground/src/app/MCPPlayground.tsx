import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import useChoreoTheme from './theme/Theme.ts';
import Playground from '../features/playground/Playground';

interface PlaygroundProps {
  url?: string;
  token?: string;
  headerName?: string;
  shouldSetHeaderNameExternally?: boolean;
  isTokenFetching?: boolean;
  isUrlFetching?: boolean;
  handleTokenRegenerate?: () => void;
  isMcpProxyWithOperationMapping?: boolean;
  tokenPlaceholder?: string;
}

function MCPPlayground(props: PlaygroundProps) {
    const theme = useChoreoTheme(false);
    return (
        <div className="mcp-playground-root">
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Playground {...props}/>
                </ThemeProvider>
            </StyledEngineProvider>
        </div>
    )
}

export default MCPPlayground
