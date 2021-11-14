/*
** EPITECH PROJECT, 2019
** test_my_revstr
** File description:
** Task04-2
*/

#include <criterion/criterion.h>

Test(my_revstr, reverse_string)
{
    char src[] = "Hello World";

    my_revstr(src);
    cr_assert_str_eq(src, "dlroW olleH");
}