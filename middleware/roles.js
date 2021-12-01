// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("contentManager")
    .createAny("content")
    .readAny("content")
    .updateAny("content")
    .deleteAny("content")
    .readOwn("user");

  ac.grant("admin")
    .extend("contentManager")
    .createAny("user")
    .readAny("user")
    .updateAny("user")
    .deleteAny("user");

  return ac;
})();
