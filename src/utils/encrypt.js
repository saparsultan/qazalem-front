export const obfuscateData = (obj) => {
  const value = obj.value;
  const labelCharCode = obj.label.charCodeAt(0);

  const value1 = Math.floor(value / 256);
  const value2 = value % 256;

  return [value1, value2, labelCharCode];
};

export const deobfuscateData = (obfuscatedString) => {
  const [value1, value2, labelCharCode] = obfuscatedString;

  const value = value1 * 256 + value2;
  const label = String.fromCharCode(labelCharCode);

  return { value, label };
};
