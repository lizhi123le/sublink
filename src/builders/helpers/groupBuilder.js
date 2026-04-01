const normalize = (value) => typeof value === 'string' ? value.trim() : value;

export function uniqueNames(names = []) {
    const seen = new Set();
    const result = [];
    names.forEach(name => {
        if (typeof name !== 'string') return;
        const normalized = normalize(name);
        if (!normalized || seen.has(normalized)) return;
        seen.add(normalized);
        result.push(normalized);
    });
    return result;
}

export function withDirectReject(options = []) {
    return uniqueNames([
        ...options,
        'DIRECT',
        'REJECT'
    ]);
}

export function buildNodeSelectMembers({ proxyList = [], translator, groupByCountry = false, manualGroupName, countryGroupNames = [], includeAutoSelect = true }) {
    if (!translator) {
        throw new Error('buildNodeSelectMembers requires a translator function');
    }
    const autoName = translator('outboundNames.Auto Select');
    // Only include Auto Select if there are proxies (Auto Select group is only created when proxyList is not empty)
    const shouldIncludeAutoSelect = includeAutoSelect && proxyList.length > 0;
    const base = groupByCountry
        ? [
            ...(shouldIncludeAutoSelect ? [autoName] : []),
            ...(manualGroupName ? [manualGroupName] : []),
            ...countryGroupNames
        ]
        : [
            ...(shouldIncludeAutoSelect ? [autoName] : []),
            ...proxyList
        ];
    return withDirectReject(base);
}

export function buildSelectorMembers({ proxyList = [], translator, groupByCountry = false, manualGroupName, countryGroupNames = [], includeAutoSelect = true }) {
    if (!translator) {
        throw new Error('buildSelectorMembers requires a translator function');
    }
    const autoName = translator('outboundNames.Auto Select');
    // Only include Auto Select if there are proxies (Auto Select group is only created when proxyList is not empty)
    const shouldIncludeAutoSelect = includeAutoSelect && proxyList.length > 0;
    const base = groupByCountry
        ? [
            translator('outboundNames.Node Select'),
            ...(shouldIncludeAutoSelect ? [autoName] : []),
            ...(manualGroupName ? [manualGroupName] : []),
            ...countryGroupNames
        ]
        : [
            translator('outboundNames.Node Select'),
            ...proxyList
        ];
    return withDirectReject(base);
}
