import pandas as pd

df = pd.read_csv("mydata.csv")


def clean_data(df: pd.DataFrame):
    """
    1. Remove rows with missing values
    2. Group by column "A" and sum the values in column "B"
    """

    return df
