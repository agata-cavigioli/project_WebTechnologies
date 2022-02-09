import csv
import json

with open('./new.csv', 'w', encoding='utf-8') as f2:
    names = [
        'Philosophers',
        'Born',
        'Birth place',
        'Died',
        'Place of Death',
        'Subjects Of Study',
    ]
    writer = csv.DictWriter(f2, fieldnames=names)
    writer.writeheader()
    for row in csv.DictReader(open('./data4.csv', 'r', encoding='utf-8')):
        del row['']
        del row['Notable Works']
        writer.writerow(row)

with open('./new.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    data = [x for x in reader]
    x = json.dumps(data, indent=4)
    with open('./new.json', 'w', encoding='utf-8') as f2:
        f2.write(x)

