/*
** EPITECH PROJECT, 2019
** my_signe
** File description:
** my_signe
*/

int my_strtol2(char *str, char **endptr, char *signe);

int my_strtol(char *str, char **endptr);

int my_signe(char str, char *signe)
{
    int i = 1;
    if (str == signe[3] || str == signe[2])
        return (1);
    if (str == signe[6] || str == signe[5] || str == signe[4])
        return (2);
    return (0);
}

int next_signe(char *str, char *signe)
{
    char sg = str[0];
    char *endptr;
    my_strtol2(str, &endptr, signe);
    if (*endptr)
    {
        if (my_signe(endptr[0], signe) == 2)
            sg = 2;
        else if (my_signe(endptr[0], signe) == 1)
            sg = 1;
        return sg;
    }
    else
        return 0;
}