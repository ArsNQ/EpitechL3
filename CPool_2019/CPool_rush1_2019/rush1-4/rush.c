/*
** EPITECH PROJECT, 2019
** rush1-4
** File description:
** Task04
*/

void part1(int x, int y, int countx)
{
    if (x >= 1)
        my_putchar('A');

    while (x > countx)
    {
        ++countx;
        my_putchar('B');
    }

    if (x >= 2)
        my_putchar('C');

    if (y >= 2)
        my_putchar('\n');
}

void part2(int x, int y, int county, int countspace)
{
    while (y > county)
    {
        ++county;

        if (x >= 1)
            my_putchar('B');

        while (x > countspace)
        {
            ++countspace;
            my_putchar(' ');
        }

        countspace = 2;

        if (x >= 2)
            my_putchar('B');

        my_putchar('\n');
    }
}

void part3(int x, int y, int countlast)
{
    if (y >= 2)
    {
        if (x >= 1)
            my_putchar('A');

        while (x > countlast)
        {
            ++countlast;
            my_putchar('B');
        }

        if (x >= 2)
            my_putchar('C');
    }
    my_putchar('\n');
}

void part4(int x, int y, int varx, int vary)
{
    if (y == 1)
    {
        while (varx < x)
        {
            ++varx;
            my_putchar('B');
        }
        my_putchar('\n');
    }
    else if (x == 1)
        while (vary < y)
        {
            ++vary;
            my_putchar('B');
            my_putchar('\n');
        }
}

void rush(int x, int y)
{
    int countx = 2;
    int county = 2;
    int countspace = 2;
    int countlast = countx;
    int varx = 0;
    int vary = 0;

    if (x <= 0 || y <= 0){
        write(2, "Invalid size\n", 14);
        return (0);}

    if (x == 1 || y == 1)
        part4(x, y, varx, vary);

    else
    {
        part1(x, y, countx);
        part2(x, y, county, countspace);
        part3(x, y, countlast);
    }
}