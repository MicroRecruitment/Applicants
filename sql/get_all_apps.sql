SELECT
    person.person_id,
    person.name,
    person.surname,
    person.email,
    (
        '{' ||
        LISTAGG(
            '"' || availability.availability_id || '" : {' ||
            '"from_date" : "' || availability.from_date || '", ' ||
            '"to_date" : "' || availability.to_date || '"' ||
            '}',
            ', '
        ) ||
        '}'
    ) as availabilities
FROM
    person
LEFT JOIN
    availability ON availability.person_id = person.person_id
WHERE
    person.status = 1
GROUP BY
    person.person_id, person.name, person.surname, person.email