/*
** EPITECH PROJECT, 2019
** my_char_cat
** File description:
** Project1
*/

char *my_char_cat(char *dest, const char src)
{
    int i = 0;
    int j = 0;

    while (dest[i] != '\0')
        i++;

    dest[i] = src;

    dest[i + 1] = '\0';
    return dest;
}
