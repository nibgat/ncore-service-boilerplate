const test = async (obj, args, context) => {
    return {
        message: `Test erişimi (query) başarılı. Gönderilen parametre: ${args.parameter}`,
        code: 200
    };
};
export default test;
