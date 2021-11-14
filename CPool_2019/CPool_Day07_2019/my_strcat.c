/*
** EPITECH PROJECT, 2019
** my_strcat
** File description:
** Task02
*/

char *my_strcat(char *dest, const char *src)
{
    int i = 0;
    int j = 0;

    while (dest[i] != '\0')
    {
        ++i;
    }
    while (src[j] != '\0')
    {
        dest[i] = src[j];
        ++i;
        ++j;
    }

    dest[i] = '\0';
    return dest;
}