const permissiveIsArrayLike = function (obj) {
  return Array.isArray(obj) || (obj != null && obj.length != null);
};

export default permissiveIsArrayLike;
