/*
** EPITECH PROJECT, 2019
** my_compute_factorial_it
** File description:
** Task01
*/

int my_compute_factorial_it(int nb)
{
    int factoriel = 1, iterative;

    if (nb < 0 || nb >= 13)
        return (0);

    if (nb == 0)
        return (1);

    for (iterative = 1; iterative <= nb; iterative++)
        factoriel = iterative * factoriel;

    return factoriel;
}