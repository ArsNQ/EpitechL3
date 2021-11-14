export const cleanUser = (user) => {
    const newUser = {...user.toObject()};
    delete newUser.password;
    delete newUser.createdAt;
    delete newUser.updatedAt;
    delete newUser.__v;
    return newUser;
};
