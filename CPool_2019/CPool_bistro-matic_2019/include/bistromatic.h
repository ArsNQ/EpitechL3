/*
** EPITECH PROJECT, 2019
** bistro
** File description:
** bistro
*/

#ifndef BISTRO_H
#define BISTRO_H

#define OP_OPEN_PARENT_IDX 0
#define OP_CLOSE_PARENT_IDX 1
#define OP_PLUS_IDX 2
#define OP_SUB_IDX 3
#define OP_NEG_IDX 3
#define OP_MULT_IDX 4
#define OP_DIV_IDX 5
#define OP_MOD_IDX 6

#define EXIT_USAGE 84
#define EXIT_BASE 84
#define EXIT_SIZE_NEG 84
#define EXIT_MALLOC 84
#define EXIT_READ 84
#define EXIT_OPS 84

#define SYNTAX_ERROR_MSG "syntax error"
#define ERROR_MSG "error"

char *eval_expr(char *signe, char *base, char *expr, unsigned int size);
int my_putstr(char const *);
int my_strlen(char const *);
int my_getnbr(char const *);
void my_putchar(char caractere);
char *my_charcat(char *dest, const char src);
char *my_revstr(char *str);
int my_signe(char str, char *signe);
int next_signe(char *str, char *signe);
char *my_strtol(char *str, char **endptr, char *signe);
char *sub(char *argv_1, char *argv_2);
char *minus(char *argv);
char *compare(char *argv1, char *argv2);
char *compare_low(char *argv1, char *argv2);
char *negatif(char *argv1, char *argv2);
void addition(char sum1, char sum2, char *res, int *ret);
void addition_2(char sum1, int *ret, char *res);
char *compare(char *argv1, char *argv2);
char *add(char *argv_1, char *argv_2);
int compare_tab(char *base, char *original);
char *traduction_base(char *expr, char *base);
char *higher(char *argv_1, char *argv_2);
char *my_strcpy(char *dest, char const *src);
int my_strtol2(char *str, char **endptr, char *signe);
char *int_operation(char *expr, char *signe);
int calcul(char *str, char *tab);
int test_parenthese(char *expr, char *signe);
void my_put_nbr(int n);
char *mult(char *argv_1, char *argv_2);
int test_plus_or_minus(char *str, char *signe);
int test_plus_and_minus(char *str, char *signe);

#endif