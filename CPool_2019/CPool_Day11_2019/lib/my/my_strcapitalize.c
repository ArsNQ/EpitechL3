/*
** EPITECH PROJECT, 2019
** my_strcapitalize
** File description:
** Task10
*/

char my_lowcase(char str)
{
    if (str >= 65 && str <= 90)
    {
        str = str + 32;
    }
    return str;
}

char my_upcase(char str)
{
    if (str >= 97 && str <= 122)
    {
        str = str - 32;
    }
    return str;
}

char *my_strcapitalize(char *str)
{
    int i = 0;
    if (str[i] >= 97 && str[i] <= 122)
        str[i] = str[i] - 32;
    while (str[i + 1] != '\0')
    {
        if (str[i - 1] < 47 || (str[i - 1] >= 58 && str[i - 1] <= 64))
        {
            str[i] = my_upcase(str[i]);
        }
        else
        {
            str[i] = my_lowcase(str[i]);
        }
        i++;
    }
    return str;
}
