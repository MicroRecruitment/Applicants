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
    ) as availabilities,
    (
        '{' ||
        LISTAGG(
            '"' || competence.competence_id || '" : {' ||
            '"name" : "' || competence.name || '", ' ||
            '"years_of_experience" : "' || competence_profile.years_of_experience || '"' ||
            '}',
            ', '
        ) ||
        '}'
    ) as competences
FROM
    person
LEFT JOIN
    availability ON availability.person_id = person.person_id
LEFT JOIN
    competence_profile ON competence_profile.person_id = person.person_id
LEFT JOIN
    competence ON competence.competence_id = competence_profile.competence_id
WHERE
    person.status = 1
GROUP BY
    person.person_id, person.name, person.surname, person.email