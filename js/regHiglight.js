const regHiglight = function (map, regId, className, clear) {
  let currPath = map.querySelector(`.${className}`);
  let newPath = map.querySelector(`#${regId}`);
  if (currPath) {
    currPath.classList.remove(className);
  }
  if (!clear && newPath) {
    newPath.classList.add(className);
    map.appendChild(newPath);
  }
};

export default regHiglight;
