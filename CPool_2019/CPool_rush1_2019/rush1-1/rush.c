/*
** EPITECH PROJECT, 2019
** rush1-1
** File description:
** Task01
*/

void part1(int x, int y, int countx)
{
    if (x >= 1)
        my_putchar('o');

    while (x > countx)
    {
        ++countx;
        my_putchar('-');
    }

    if (x >= 2)
        my_putchar('o');

    if (y >= 2)
        my_putchar('\n');
}

void part2(int x, int y, int county, int countspace)
{
    while (y > county)
    {
        ++county;

        if (x >= 1)
            my_putchar('|');

        while (x > countspace)
        {
            ++countspace;
            my_putchar(' ');
        }

        countspace = 2;

        if (x >= 2)
            my_putchar('|');

        my_putchar('\n');
    }
}

void part3(int x, int y, int countlast)
{
        if (y >= 2)
    {
        if (x >= 1)
            my_putchar('o');

        while (x > countlast)
        {
            ++countlast;
            my_putchar('-');
        }

        if (x >= 2)
            my_putchar('o');
    }
    my_putchar('\n');
}

void rush(int x, int y)
{
    int countx = 2;
    int county = 2;
    int countspace = 2;
    int countlast = countx;

    if (x <= 0 || y <= 0){
        write(2, "Invalid size\n", 14);
        return (0);}

    part1(x, y, countx);
    part2(x, y, county, countspace);
    part3(x, y, countlast);
}
