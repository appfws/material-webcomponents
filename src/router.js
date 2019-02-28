export default (outlet, routes) => {
  const getCurrentRoute = url => url.replace(location.origin, '');

  const getMatchedRoute = url => routes.find(route => url === route.url);

  const handleRoute = matchedRoute => {
    let {template, templateUrl, url} = matchedRoute;

    if(templateUrl) {
      fetch(templateUrl)
      .then(response => response.text())
      .then(html => {
        matchedRoute.template = html;
        history.pushState({template, url}, null, url);

        activateRoute(matchedRoute);
      });
    }
    else {
      history.pushState({template, url}, null, url);
      activateRoute(matchedRoute);
    }
  };

  const activateRoute = ({template, controller}) => {
    outlet.innerHTML = template;

    if(controller && typeof controller === 'function') {
      controller();
    }
  };

  document.querySelectorAll('a').forEach(link => {
    link.onclick = e => {
      const target = e.composedPath().find(el => el.hasAttribute('href'));
      const matchedRoute = getMatchedRoute(getCurrentRoute(target.href));

      if(matchedRoute) {
        e.preventDefault();
        handleRoute(matchedRoute);
      }
    };
  });

  window.addEventListener('popstate', e => {
    const matchedRoute = getMatchedRoute(e.state.url);

    activateRoute(matchedRoute);
  });

  handleRoute(getMatchedRoute(getCurrentRoute(location.href)));
};
