import { jsx as _jsx } from "react/jsx-runtime";
import { FileButton, Loader } from '@mantine/core';
import { Upload } from 'lucide-react';
import { ActionIconButton } from './action-icon-button';
import { useState } from 'react';
export const LoadButton = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    return (_jsx(FileButton, { onChange: async (...args) => {
            setIsLoading(true);
            await props.onLoad(...args);
            setIsLoading(false);
        }, accept: ".csv,text/csv", disabled: isLoading, children: (props) => (_jsx(ActionIconButton, { ...props, children: isLoading ? _jsx(Loader, { color: "white", size: "xs" }) : _jsx(Upload, {}) })) }));
};
