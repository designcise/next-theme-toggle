import React, { memo } from 'react';

export default memo(function AntiFlickerScript({ theme, color }) {
    const script = `(function(theme,root){root.classList.remove(\`'${Object.values(color).join("','")}'\`);root.classList.add(theme);root.style.colorScheme=theme;})('${theme}',document.firstElementChild)`;
    return <script dangerouslySetInnerHTML={{ __html: script }} />
}, () => true);
