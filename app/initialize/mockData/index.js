import {
    r
} from "../../database";

const MockData = async () => {
    // DB create:
    const dbList = await r.dbList();

    if(dbList.indexOf("test") !== -1) {
        await r.dbDrop("test");
    }

    /*
    MIGRATE FOR YOUR DB STRUCTURE (ex.):

    if(dbList.indexOf("core") === -1) {
        await r.dbCreate("core");
    }

    // Tables Create:
    const tableList = await r.db("core").tableList();

    if(tableList.indexOf("users") === -1) {
        await r.db("core").tableCreate("users");
    }
    */
};
export default MockData;
