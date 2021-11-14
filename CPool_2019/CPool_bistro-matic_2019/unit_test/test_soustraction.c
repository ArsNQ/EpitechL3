/*
** EPITECH PROJECT, 2019
** test_soustraction
** File description:
** soustraction
*/

#include <criterion/criterion.h>

char *sub(char *argv_1, char *argv_2)

Test(parse_args, normal)
{
    cr_assert_str_empty(soustraction, " ");
    cr_assert_str_not_empty(soustraction, "++"),
    cr_assert_str_not_empty(soustraction, "--");
    cr_assert_str_not_empty(soustraction, 'a');
    cr_assert_str_not_empty(soustraction, "jozbfzbfozn");
    cr_assert_str_not_empty(soustraction, "()()()()()()()()()()()");
    cr_assert_str_not_empty(soustrcation, '.');
    cr_assert_str_not_empty(soustraction, ':');
    cr_assert_str_not_empty(soustraction, '/');
}

char * minus(char *argv)
 
test(parse_args, normal)
{
    cr_assert_str_not_empty(soustraction, "1541658416845");
    cr_assert_str_not_empty(soustraction, "++");
    cr_assert_str_not_empty(soustraction, "japeide");
    cr_assert_str_not_empty(soustraction, ".?:/:;!!*/-/*");
    cr_assert_str_empty(soustraction, ' ');
}

