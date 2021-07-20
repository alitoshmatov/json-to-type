const JsonToType = (json: string): string | null => {
  try {
    const parsed: any = JSON.parse(json);
    if (parsed) {
      if (Array.isArray(parsed)) return ArrToStr(parsed);
      if (typeof parsed === "object") return ObjToStr(parsed);
    }
  } catch (e) {
    console.log(e);
    return null;
  }
  return null;
};

const CheckType = (value: any): string => {
  if (typeof value === "undefined") {
    return "any";
  }
  if (Array.isArray(value)) {
    return ArrToStr(value);
  }
  if (typeof value === "object") {
    return ObjToStr(value);
  }

  return typeof value;
};

const ObjToStr = (obj: Object): string => {
  let result = "{";

  for (const property in obj) {
    result = result.concat(`${property}: ${CheckType(obj[property])}; `);
  }

  return result.concat("}");
};

const ArrToStr = (arr: unknown[]): string => {
  if (arr.length === 0) return "any[]";
  const types = new Set<string>();

  arr.forEach((item) => {
    types.add(CheckType(item));
  });
  return `(${[...types].join("|")})[]`;
};

export default JsonToType;
