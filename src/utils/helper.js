export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

export const getInitails = (name) => {
    if (!name) return "";

    const nameArray = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(nameArray.length, 2); i++) {
        initials += nameArray[i][0];
    }
    return initials.toUpperCase();
}