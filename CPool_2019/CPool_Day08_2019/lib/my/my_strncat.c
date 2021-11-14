/*
** EPITECH PROJECT, 2019
** my_strncat
** File description:
** Task03
*/

char *my_strncat(char *dest, char const *src, int n)
{
    int i = 0;
    int j = 0;
    while (dest[j] != '\0')
        j++;
    for (i = 0; i < n && src[i] != '\0'; i++)
        dest[j + i] = src[i];
    dest[j + i] = '\0';
    return dest;
}