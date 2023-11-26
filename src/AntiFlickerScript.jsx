import React, { memo } from 'react';

export default memo(function AntiFlickerScript({ theme, color }) {
    const colorValues = Object.values(color).map(value => String(value));
    const classList = colorValues.join("','");

    const script = `!function(theme,root){root.classList.remove('${classList}');root.classList.add(theme);root.style.colorScheme=theme;}('${theme}',document.firstElementChild)`;
    return <script dangerouslySetInnerHTML={{ __html: script }} />
}, () => true);
