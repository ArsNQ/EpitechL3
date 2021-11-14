#!/usr/bin/env python3
import random
import sys

infotext = 'name="pbrain-ai", author="Basile et Quentin", country="France"'
BOARD_SIZE = 19
board = [[0 for x in range(BOARD_SIZE)] for y in range(BOARD_SIZE)]
info_timeout_turn = 50000


def myTurn(x, y):
    global board
    if isBoxFree(x, y):
        board[x][y] = 1
    else:
        printParams("Error on the move : {}, {}".format(x, y))


def opponentTurn(x, y):
    global board
    if isBoxFree(x, y):
        board[x][y] = 2
    else:
        printParams("Error on the opposent move : {}, {}".format(x, y))


def checkMyMove(x, y):
    if x < 0 or x > BOARD_SIZE - 1:
        return False
    if y < 0 or y > BOARD_SIZE - 1:
        return False
    return True


def printParams(cmd):
    print(cmd)
    sys.stdout.flush()


def do_mymove(x, y):
    myTurn(x, y)
    printParams("{},{}".format(x, y))


def getParams():
    return sys.stdin.readline().strip()


def commandParam(command, line):
    cmd = command.lower()
    ln = line.lower()
    len1 = len(command)
    len2 = len(line)
    if len1 > len2 or not ln.startswith(cmd):
        return None
    return line[len1:].lstrip()


def isBoxFree(x, y):
    global board
    if board[x][y] == 1 or board[x][y] == 2 or x > (BOARD_SIZE - 1) or x < 0 or y > (BOARD_SIZE - 1) or y < 0:
        return False
    else:
        return True


def checkEmptyBoard():
    global board
    for i in range(BOARD_SIZE - 1):
        for j in range(BOARD_SIZE - 1):
            if board[i][j] == 1:
                return None

    if isBoxFree(9, 9):
        return [9, 9]
    elif not isBoxFree(9, 9):
        return [10, 8]


def doCommand(cmd):
    global board, info_timeout_turn

    param = commandParam("info", cmd)
    if param is not None:
        info = commandParam("timeout_turn", param)
        if info is not None:
            info_timeout_turn = int(info)
            return

    param = commandParam("start", cmd)
    if param is not None:
        if len(param) == 0:
            size = 19

            if size != BOARD_SIZE:
                printParams("Error, size is {} but must be 19".format(size))
                sys.exit(84)

            board = [[0 for x in range(BOARD_SIZE)] for y in range(BOARD_SIZE)]
            printParams("OK")
        elif len(param) > 0:
            size = int(param)

            if size != BOARD_SIZE:
                printParams("Error, size is {} but must be 19".format(size))
                sys.exit(84)

            board = [[0 for x in range(BOARD_SIZE)] for y in range(BOARD_SIZE)]
            printParams("OK")

    param = commandParam("turn", cmd)
    if param is not None:
        posTab = param.split(",")
        opponentTurn(int(posTab[0]), int(posTab[1]))

        test = checkEmptyBoard()
        if test is None:
            if defense() is not None:
                coord = defense()
                do_mymove(coord[0], coord[1])
            elif attaque() is not None:
                coord = attaque()
                do_mymove(coord[0], coord[1])
            elif near() is not None:
                coord = near()
                do_mymove(coord[0], coord[1])
            else:
                coord = random_near()
                do_mymove(coord[0], coord[1])
        else:
            do_mymove(test[0], test[1])

    param = commandParam("begin", cmd)
    if param is not None:
        test = checkEmptyBoard()
        if test is None:
            if defense() is not None:
                coord = defense()
                do_mymove(coord[0], coord[1])
            elif attaque() is not None:
                coord = attaque()
                do_mymove(coord[0], coord[1])
            elif near() is not None:
                coord = near()
                do_mymove(coord[0], coord[1])
            else:
                coord = random_near()
                do_mymove(coord[0], coord[1])
        else:
            do_mymove(test[0], test[1])

    param = commandParam("about", cmd)
    if param is not None:
        printParams(infotext)
        return

    param = commandParam("end", cmd)
    if param is not None:
        sys.exit(0)

    param = commandParam("board", cmd)
    if param is not None:
        line = sys.stdin.readline()
        commandTab = line.strip().split(" ")
        while commandTab[0] != "DONE":
            coord = line.strip().split(",")
            opponentTurn(int(coord[0]), int(coord[1]))
            line = sys.stdin.readline()
            commandTab = line.strip().split(" ")

        test = checkEmptyBoard()
        if test is None:
            if defense() is not None:
                coord = defense()
                do_mymove(coord[0], coord[1])
            elif attaque() is not None:
                coord = attaque()
                do_mymove(coord[0], coord[1])
            elif near() is not None:
                coord = near()
                do_mymove(coord[0], coord[1])
            else:
                coord = random_near()
                do_mymove(coord[0], coord[1])
        else:
            do_mymove(test[0], test[1])


def randomMove():
    x = random.randint(0, BOARD_SIZE - 1)
    y = random.randint(0, BOARD_SIZE - 1)
    while not isBoxFree(x, y):
        x = random.randint(0, BOARD_SIZE - 1)
        y = random.randint(0, BOARD_SIZE - 1)
    return [x, y]


def attaque():
    global board
    for i in range(BOARD_SIZE - 1):
        for j in range(BOARD_SIZE - 1):
            if board[i][j] == 1:
                if board[i][j + 1] == 1 and (board[i][j + 2] == 1 or board[i][j + 3] == 1):
                    if isBoxFree(i, j + 3):
                        return [i, j + 3]
                    elif isBoxFree(i, j - 1):
                        return [i, j - 1]
                    elif isBoxFree(i, j + 4):
                        return [i, j + 4]
                    elif isBoxFree(i, j + 2):
                        return [i, j + 2]
                if board[i + 1][j] == 1 and (board[i + 2][j] == 1 or board[i + 3][j] == 1):
                    if isBoxFree(i + 3, j):
                        return [i + 3, j]
                    elif isBoxFree(i - 1, j):
                        return [i - 1, j]
                    elif isBoxFree(i + 4, j):
                        return [i + 4, j]
                    elif isBoxFree(i + 2, j):
                        return [i + 2, j]
                if board[i + 1][j + 1] == 1 and (board[i + 2][j + 2] == 1 or board[i + 3][j + 3] == 1):
                    if isBoxFree(i + 3, j + 3):
                        return [i + 3, j + 3]
                    elif isBoxFree(i - 1, j - 1):
                        return [i - 1, j - 1]
                    elif isBoxFree(i + 4, j + 4):
                        return [i + 4, j + 4]
                    elif isBoxFree(i + 2, j + 2):
                        return [i + 2, j + 2]
                if board[i + 1][j - 1] == 1 and (board[i + 2][j - 2] == 1 or board[i + 3][j - 3] == 1):
                    if isBoxFree(i + 3, j - 3):
                        return [i + 3, j - 3]
                    elif isBoxFree(i - 1, j + 1):
                        return [i - 1, j + 1]
                    elif isBoxFree(i + 4, j - 4):
                        return [i + 4, j - 4]
                    elif isBoxFree(i + 2, j - 2):
                        return [i + 2, j - 2]
                if board[i - 1][j + 1] == 1 and (board[i - 2][j + 2] == 1 or board[i - 3][j + 3] == 1):
                    if isBoxFree(i - 3, j + 3):
                        return [i - 3, j + 3]
                    elif isBoxFree(i + 1, j - 1):
                        return [i + 1, j - 1]
                    elif isBoxFree(i - 4, j + 4):
                        return [i - 4, j + 4]
                    elif isBoxFree(i - 2, j + 2):
                        return [i - 2, j + 2]
                if board[i - 1][j - 1] == 1 and (board[i - 2][j - 2] == 1 or board[i - 3][j - 3] == 1):
                    if isBoxFree(i - 3, j - 3):
                        return [i - 3, j - 3]
                    elif isBoxFree(i + 1, j + 1):
                        return [i + 1, j + 1]
                    elif isBoxFree(i - 4, j - 4):
                        return [i - 4, j - 4]
                    elif isBoxFree(i - 2, j - 2):
                        return [i - 2, j + 2]
                if board[i - 1][j] == 1 and (board[i - 2][j] == 1 or board[i - 3][j] == 1):
                    if isBoxFree(i - 3, j):
                        return [i - 3, j]
                    elif isBoxFree(i + 1, j):
                        return [i + 1, j]
                    elif isBoxFree(i - 4, j):
                        return [i - 4, j]
                    elif isBoxFree(i - 2, j):
                        return [i - 2, j]
                if board[i][j - 1] == 1 and (board[i][j - 2] == 1 or board[i][j - 3] == 1):
                    if isBoxFree(i, j - 3):
                        return [i, j - 3]
                    elif isBoxFree(i, j + 1):
                        return [i, j + 1]
                    elif isBoxFree(i, j - 4):
                        return [i, j - 4]
                    elif isBoxFree(i, j - 2):
                        return [i, j - 2]
    return None


def defense():
    global board
    for i in range(BOARD_SIZE - 1):
        for j in range(BOARD_SIZE - 1):
            if board[i][j] == 2:
                if board[i][j + 1] == 2 and (board[i][j + 2] == 2 or board[i][j + 3] == 2):
                    if isBoxFree(i, j + 3):
                        return [i, j + 3]
                    elif isBoxFree(i, j - 1):
                        return [i, j - 1]
                    elif isBoxFree(i, j + 4):
                        return [i, j + 4]
                    elif isBoxFree(i, j + 2):
                        return [i, j + 2]
                if board[i + 1][j] == 2 and (board[i + 2][j] == 2 or board[i + 3][j] == 2):
                    if isBoxFree(i + 3, j):
                        return [i + 3, j]
                    elif isBoxFree(i - 1, j):
                        return [i - 1, j]
                    elif isBoxFree(i + 4, j):
                        return [i + 4, j]
                    elif isBoxFree(i + 2, j):
                        return [i + 2, j]
                if board[i + 1][j + 1] == 2 and (board[i + 2][j + 2] == 2 or board[i + 3][j + 3] == 2):
                    if isBoxFree(i + 3, j + 3):
                        return [i + 3, j + 3]
                    elif isBoxFree(i - 1, j - 1):
                        return [i - 1, j - 1]
                    elif isBoxFree(i + 4, j + 4):
                        return [i + 4, j + 4]
                    elif isBoxFree(i + 2, j + 2):
                        return [i + 2, j + 2]
                if board[i + 1][j - 1] == 2 and (board[i + 2][j - 2] == 2 or board[i + 3][j - 3] == 2):
                    if isBoxFree(i + 3, j - 3):
                        return [i + 3, j - 3]
                    elif isBoxFree(i - 1, j + 1):
                        return [i - 1, j + 1]
                    elif isBoxFree(i + 4, j - 4):
                        return [i + 4, j - 4]
                    elif isBoxFree(i + 2, j - 2):
                        return [i + 2, j - 2]
                if board[i - 1][j + 1] == 2 and (board[i - 2][j + 2] == 2 or board[i - 3][j + 3] == 2):
                    if isBoxFree(i - 3, j + 3):
                        return [i - 3, j + 3]
                    elif isBoxFree(i + 1, j - 1):
                        return [i + 1, j - 1]
                    elif isBoxFree(i - 4, j + 4):
                        return [i - 4, j + 4]
                    elif isBoxFree(i - 2, j + 2):
                        return [i - 2, j + 2]
                if board[i - 1][j - 1] == 2 and (board[i - 2][j - 2] == 2 or board[i - 3][j - 3] == 2):
                    if isBoxFree(i - 3, j - 3):
                        return [i - 3, j - 3]
                    elif isBoxFree(i + 1, j + 1):
                        return [i + 1, j + 1]
                    elif isBoxFree(i - 4, j - 4):
                        return [i - 4, j - 4]
                    elif isBoxFree(i - 2, j - 2):
                        return [i - 2, j + 2]
                if board[i - 1][j] == 2 and (board[i - 2][j] == 2 or board[i - 3][j] == 2):
                    if isBoxFree(i - 3, j):
                        return [i - 3, j]
                    elif isBoxFree(i + 1, j):
                        return [i + 1, j]
                    elif isBoxFree(i - 4, j):
                        return [i - 4, j]
                    elif isBoxFree(i - 2, j):
                        return [i - 2, j]
                if board[i][j - 1] == 2 and (board[i][j - 2] == 2 or board[i][j - 3] == 2):
                    if isBoxFree(i, j - 3):
                        return [i, j - 3]
                    elif isBoxFree(i, j + 1):
                        return [i, j + 1]
                    elif isBoxFree(i, j - 4):
                        return [i, j - 4]
                    elif isBoxFree(i, j - 2):
                        return [i, j - 2]
    return None


def near():
    global board
    for i in range(BOARD_SIZE - 1):
        for j in range(BOARD_SIZE - 1):
            if board[i][j] == 1:
                if board[i][j + 1] == 1 or board[i][j + 2] == 1:
                    if isBoxFree(i, j + 1):
                        return [i, j + 1]
                    elif isBoxFree(i, j - 1):
                        return [i, j - 1]
                    elif isBoxFree(i, j + 2):
                        return [i, j + 2]
                if board[i + 1][j] == 1 or board[i + 2][j] == 1:
                    if isBoxFree(i + 1, j):
                        return [i + 1, j]
                    elif isBoxFree(i - 1, j):
                        return [i - 1, j]
                    elif isBoxFree(i + 2, j):
                        return [i + 2, j]
                if board[i + 1][j + 1] == 1 or board[i + 2][j + 2] == 1:
                    if isBoxFree(i + 1, j + 1):
                        return [i + 1, j + 1]
                    elif isBoxFree(i - 1, j - 1):
                        return [i - 1, j - 1]
                    elif isBoxFree(i + 2, j + 2):
                        return [i + 2, j + 2]
                if board[i + 1][j - 1] == 1 or board[i + 2][j - 2] == 1:
                    if isBoxFree(i + 1, j - 1):
                        return [i + 1, j - 1]
                    elif isBoxFree(i - 1, j + 1):
                        return [i - 1, j + 1]
                    elif isBoxFree(i + 2, j - 2):
                        return [i + 2, j - 2]
                if board[i - 1][j + 1] == 1 or board[i - 2][j + 2] == 1:
                    if isBoxFree(i - 1, j + 1):
                        return [i - 1, j + 1]
                    elif isBoxFree(i + 1, j - 1):
                        return [i + 1, j - 1]
                    elif isBoxFree(i - 2, j + 2):
                        return [i - 2, j + 2]
                if board[i][j - 1] == 1 or board[i][j - 2] == 1:
                    if isBoxFree(i, j - 1):
                        return [i, j - 1]
                    elif isBoxFree(i, j + 1):
                        return [i, j + 1]
                    elif isBoxFree(i, j - 2):
                        return [i, j - 2]
                if board[i - 1][j] == 1 or board[i - 2][j] == 1:
                    if isBoxFree(i - 1, j):
                        return [i - 1, j]
                    elif isBoxFree(i + 1, j):
                        return [i + 1, j]
                    elif isBoxFree(i - 2, j):
                        return [i - 2, j]
    return None


def random_near():
    global board
    for i in range(BOARD_SIZE - 1):
        for j in range(BOARD_SIZE - 1):
            if board[i][j] == 1:
                if isBoxFree(i, j + 1):
                    return [i, j + 1]
                elif isBoxFree(i + 1, j + 1):
                    return [i + 1, j + 1]
                elif isBoxFree(i + 1, j):
                    return [i + 1, j]
                elif isBoxFree(i - 1, j):
                    return [i - 1, j]
                elif isBoxFree(i - 1, j - 1):
                    return [i - 1, j - 1]
                elif isBoxFree(i, j - 1):
                    return [i, j - 1]
                elif isBoxFree(i + 1, j - 1):
                    return [i + 1, j - 1]
                elif isBoxFree(i - 1, j + 1):
                    return [i - 1, j + 1]
                else:
                    coord = randomMove()
                    return [coord[0], coord[1]]


def main():
    while True:
        cmd = getParams()
        doCommand(cmd)


if __name__ == "__main__":
    main()
