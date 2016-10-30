import pandas as pd

df = pd.read_csv('data.csv', parse_dates=['datetime_published'])
df = df.sort(columns=['datetime_published'])
df.to_csv('data.csv', index=False)
