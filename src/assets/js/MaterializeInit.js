document.addEventListener('DOMContentLoaded', function () {
  InicializarMenus();
  InicializarSelect();
  InicializarDropMenu();
});

function InicializarMenus() {
  var menus = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(menus, {});
}

function InicializarSelect() {
  var selects = document.querySelectorAll('select');
  var instances = M.FormSelect.init(selects, {});
}

function InicializarDropMenu() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {
    hover:true,
    coverTrigger:false,
    constrainWidth:false,
  });
}