// 正则表达式
export const accReg=/^([u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/
export const pwdReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/