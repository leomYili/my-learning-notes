var backspaceCompare = function(S, T) {
    let reg = /(^\#)|([a-z]{1}?\#)/g;
    
    S = S.replace(reg, '');
    T = T.replace(reg, '');
    
    if(!S.includes("#") && !T.includes("#")){
        return S == T;
    }

    return backspaceCompare(S,T);
};