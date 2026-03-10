---
layout: page
title: "Intro to ML: Sentiment Analysis and Stock Prices"
description: Using techniques from 10-315 for sentiment analysis with applications to stock market prediction
img: assets/img/projects/ml.svg
importance: 6
category: work
---

For this final project, our team decided to create a machine learning model for sentiment analysis, which basically reads a sentence and determines whether it consists of a positive or a negative tone. The dataset we will be using is called [Stock-Market Sentiment Dataset](https://www.kaggle.com/datasets/yash612/stockmarket-sentiment-dataset), which consists of 2 columns, the text and whether it's positive or negative.

Since these are taken from the stock market news, we are also able to apply our model to other news websites and predict their sentiment. Using this, we shall also analyze whether there is a strong correlation between the sentiment of the news as well as the change in price of a stock, which uses this [dataset](https://www.kaggle.com/datasets/BidecInnovations/stock-price-and-news-realted-to-it?select=AppleNewsStock.csv).

In the end, we determined that individually, a Support Vector Machine works best for such a classification task, which achieved an accuracy of 77%. Furthermore, a combination of all the models does not seem to have a huge difference for directly analyzing sentiment, and neither model does well in predicting stock prices. This is because a lot of factors influence the change in stock prices other than the news itself.

**Date:** May 2023

<a href="https://github.com/Jerick-1380/10315-Final-Project" class="btn btn-sm z-depth-0" role="button" target="_blank">GitHub Repository</a>
