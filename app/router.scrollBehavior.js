const scrollBehavior = (to, from, savedPosition) => {
  return savedPosition ? savedPosition : { x: 0, y: 0 }
}

export default scrollBehavior;