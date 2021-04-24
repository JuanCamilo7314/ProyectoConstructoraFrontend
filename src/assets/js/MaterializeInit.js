document.addEventListener('DOMContentLoaded', function () {
  InicializarMenus();
  InicializarSelect();
});

function InicializarMenus() {
  var menus = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(menus, {});
}

function InicializarSelect() {
  var selects = document.querySelectorAll('select');
  var instances = M.FormSelect.init(selects, {});
}