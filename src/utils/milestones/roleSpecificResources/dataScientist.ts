
import { DetailedResource } from '../resourceUtilities';

/**
 * Detailed resources for data scientists
 */
export const dataScientistResources: Record<string, DetailedResource[]> = {
  'data_analysis': [
    {
      name: 'Python for Data Science and Machine Learning Bootcamp',
      url: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
      type: 'course',
      isPaid: true,
      description: 'Comprehensive course on Python for data analysis'
    },
    {
      name: 'Kaggle Learn',
      url: 'https://www.kaggle.com/learn/overview',
      type: 'course',
      isPaid: false,
      description: 'Free interactive courses on data science'
    },
    {
      name: 'Pandas Documentation',
      url: 'https://pandas.pydata.org/docs/',
      type: 'article',
      isPaid: false,
      description: 'Official documentation for the Pandas library'
    },
    {
      name: 'Data Visualization with Matplotlib and Seaborn',
      url: 'https://www.datacamp.com/courses/introduction-to-data-visualization-with-matplotlib',
      type: 'course',
      isPaid: true,
      description: 'Learn to create effective data visualizations'
    }
  ],
  'machine_learning': [
    {
      name: 'Machine Learning by Andrew Ng',
      url: 'https://www.coursera.org/learn/machine-learning',
      type: 'course',
      isPaid: true,
      description: 'Foundational machine learning course from Stanford'
    },
    {
      name: 'Scikit-learn Documentation',
      url: 'https://scikit-learn.org/stable/documentation.html',
      type: 'article',
      isPaid: false,
      description: 'Official documentation for Scikit-learn'
    },
    {
      name: 'Kaggle Competitions',
      url: 'https://www.kaggle.com/competitions',
      type: 'tool',
      isPaid: false,
      description: 'Practice machine learning through competitions'
    },
    {
      name: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
      url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
      type: 'book',
      isPaid: true,
      description: 'Practical guide to implementing machine learning'
    }
  ],
  'deep_learning': [
    {
      name: 'Deep Learning Specialization',
      url: 'https://www.coursera.org/specializations/deep-learning',
      type: 'course',
      isPaid: true,
      description: 'Comprehensive deep learning courses by Andrew Ng'
    },
    {
      name: 'TensorFlow Documentation',
      url: 'https://www.tensorflow.org/guide',
      type: 'article',
      isPaid: false,
      description: 'Official TensorFlow guides and tutorials'
    },
    {
      name: 'PyTorch Documentation',
      url: 'https://pytorch.org/docs/stable/index.html',
      type: 'article',
      isPaid: false,
      description: 'Official PyTorch documentation'
    },
    {
      name: 'Papers With Code',
      url: 'https://paperswithcode.com/',
      type: 'tool',
      isPaid: false,
      description: 'Find state-of-the-art implementations for research papers'
    }
  ],
  'mlops': [
    {
      name: 'MLOps Specialization',
      url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops',
      type: 'course',
      isPaid: true,
      description: 'Learn to deploy ML models to production'
    },
    {
      name: 'MLflow Documentation',
      url: 'https://mlflow.org/docs/latest/index.html',
      type: 'article',
      isPaid: false,
      description: 'Official documentation for the MLflow platform'
    },
    {
      name: 'Docker for Machine Learning',
      url: 'https://www.pluralsight.com/courses/docker-machine-learning-applications',
      type: 'course',
      isPaid: true,
      description: 'Learn to containerize ML applications'
    },
    {
      name: 'Kubeflow Documentation',
      url: 'https://www.kubeflow.org/docs/',
      type: 'article',
      isPaid: false,
      description: 'Documentation for Kubernetes machine learning toolkit'
    }
  ]
};
