/*
** EPITECH PROJECT, 2019
** my_revstr
** File description:
** Task03
*/

int my_strlen(char const *str)
{
    int i = 0;

    while (str[i] != '\0')
    {
        i++;
    }
    return (i);
}

char *my_revstr(char *str)
{
    int count = 0;
    int total = 0;
    char stock;

    count = my_strlen(str);

    for (total = 0; total < count / 2; ++total)
    {
        stock = str[total];
        str[total] = str[count - total - 1];
        str[count - total - 1] = stock;
    }
    return (str);
}