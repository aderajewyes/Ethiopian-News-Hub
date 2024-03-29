const request = require('supertest');
const express = require('express');
const router = require('../routes/route').router;

const app = express();
app.use(express.json());
app.use(router);

const mongoose = require('mongoose');
const News = require('../models/EthioNewsModel'); 
jest.mock('../models/EthioNewsModel');

describe('Integration tests for routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST /news should create a new news article', async () => {
    News.mockImplementationOnce(() => ({
      save: jest.fn().mockResolvedValueOnce({
        _id: '60b7e8d2a08cf558e04966e4', // Mocked ObjectId
        title: 'Test News Article',
        news: 'This is a test news article content.',
        article:"article",
        source: 'Test Source',
        createdAt: Date.now(),
      }),
    }));

   
  });

  it('GET /news should retrieve all news articles', async () => {
    News.find.mockResolvedValueOnce([
      {
        _id: '60b7e8d2a08cf558e04966e4',
        title: 'Test News Article 1',
        article:"article1",
        news: 'This is test news article 1 content.',
        source: 'Test Source 1',
        createdAt: Date.now(),
      },
      {
        _id: '60b7e8d2a08cf558e04966e5',
        title: 'Test News Article 2',
        article:"article2",
        news: 'This is test news article 2 content.',
        source: 'Test Source 2',
        createdAt: Date.now(),
      },
    ]);

    
  });

  it('GET /news/:title should retrieve a specific news article by title', async () => {
    News.findOne.mockResolvedValueOnce({
      _id: '60b7e8d2a08cf558e04966e4',
      title: 'Test News Article',
      news: 'This is a test news article content.',
      article:"article",
      source: 'Test Source',
      createdAt: Date.now(),
    });

    
  });

  it('GET /news/createdAt/past-two-days should retrieve news articles created in the past two days', async () => {
    News.find.mockResolvedValueOnce([
      {
        _id: '60b7e8d2a08cf558e04966e4',
        title: 'Test News Article 1',
        article:"article1",
        news: 'This is test news article 1 content.',
        source: 'Test Source 1',
        createdAt: Date.now() - 86400000, // One day ago
      },
      {
        _id: '60b7e8d2a08cf558e04966e5',
        title: 'Test News Article 2',
        article:"article2",
        news: 'This is test news article 2 content.',
        source: 'Test Source 2',
        createdAt: Date.now() - 172800000, // Two days ago
      },
    ]);

    
  });
});
