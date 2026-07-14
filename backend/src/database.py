"""Database connection utilities for the application."""

from collections.abc import Generator

import mysql.connector
from mysql.connector import MySQLConnection
from mysql.connector.errors import Error

from src.config import DATABASE_CONFIG


def get_database_connection() -> MySQLConnection:
    """Create and return a connection to the MySQL database.

    Returns:
        An active MySQL database connection.

    Raises:
        Error: If the connection to MySQL cannot be established.
    """
    try:
        connection = mysql.connector.connect(**DATABASE_CONFIG)
    except Error as exc:
        raise Error("Unable to connect to the university records database.") from exc

    return connection


def provide_database_connection() -> Generator[MySQLConnection, None, None]:
    """Provide a database connection for a single API request.

    Yields:
        An active MySQL connection.

    The connection is closed automatically after the request finishes.
    """
    connection = get_database_connection()

    try:
        yield connection
    finally:
        connection.close()
