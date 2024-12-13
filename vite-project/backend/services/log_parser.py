def parse_log_file(filepath):
    """
    Parses a log file and extracts key information.
    :param filepath: Path to the log file.
    :return: A list of parsed log entries.
    """
    parsed_logs = []
    with open(filepath, "r") as file:
        for line in file:
            # Example log format: [2023-12-12 10:00:00] [INFO] [node_name] Message content
            parts = line.strip().split("] ")
            if len(parts) < 4:
                continue

            timestamp = parts[0][1:]  # Remove leading "["
            level = parts[1][1:]      # Remove leading "["
            node = parts[2][1:]       # Remove leading "["
            message = parts[3]

            parsed_logs.append({
                "timestamp": timestamp,
                "level": level,
                "node": node,
                "message": message,
            })

    return parsed_logs
