library(ggplot2)

diamonds |>
    ggplot(aes(x = carat, y = price, fill = cut)) +
    geom_point() +
    theme(legend.positino = "top")
