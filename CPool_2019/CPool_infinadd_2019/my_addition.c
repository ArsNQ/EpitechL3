/*
** EPITECH PROJECT, 2019
** my_addition
** File description:
** project1
*/

void my_addition(char argv_1, char argv_2, char *res, int *ret)
{
    int total = 0;
    total = (argv_1 - 48) + (argv_2 - 48) + *ret;
    *ret = 0;
    if (total > 9){
        total = total - 10;
        *ret = 1;
    }
    my_char_cat(res, total + 48);
}

void my_addition_2(char argv_1, int *ret, char *res)
{
    int total = 0;
    total = (argv_1 - 48) + *ret;
    *ret = 0;
    if (total > 9){
        total = total - 10;
        *ret = 1;
    }
    my_char_cat(res, total + 48);
}
