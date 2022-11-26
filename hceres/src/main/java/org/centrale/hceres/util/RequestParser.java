package org.centrale.hceres.util;

public class RequestParser {

    public static Integer parseInt(Object number) throws NumberFormatException {
        if (number instanceof Integer)
            return (Integer) number;
        else return Integer.parseInt(String.valueOf(number));
    }
}
