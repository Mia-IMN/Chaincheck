import { useState, useEffect, useCallback } from 'react';
import { Token, TokenAnalysis, AnalysisCategory, AnalysisMetric } from '../types';

export const useTokenAnalysis = (token: Token | null) => {
  const [analysis, setAnalysis] = useState<TokenAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async (tokenData: Token): Promise<TokenAnalysis> => {
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Smart Contract Behavior Analysis (40%)
    const smartContractMetrics: AnalysisMetric[] = [
      {
        name: 'Contract Verification',
        abbreviation: 'CV',
        description: 'Whether the smart contract code is verified and publicly viewable',
        value: tokenData.symbol === 'SUI' ? 100 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.3 ? 'safe' : 'warning',
        weight: 20
      },
      {
        name: 'Honeypot Detection',
        abbreviation: 'HP',
        description: 'Checks if token can be bought but not sold (honeypot scam)',
        value: Math.random() * 100,
        status: Math.random() > 0.1 ? 'safe' : 'risk',
        weight: 25
      },
      {
        name: 'Mint Authority',
        abbreviation: 'MA',
        description: 'Whether unlimited tokens can be minted after launch',
        value: tokenData.symbol === 'SUI' ? 85 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.2 ? 'safe' : 'warning',
        weight: 20
      },
      {
        name: 'Owner Privileges',
        abbreviation: 'OP',
        description: 'Level of control owner has (pause, blacklist, fee changes)',
        value: Math.random() * 100,
        status: Math.random() > 0.25 ? 'safe' : 'warning',
        weight: 20
      },
      {
        name: 'Hidden Functions',
        abbreviation: 'HF',
        description: 'Detection of backdoors or self-destruct mechanisms',
        value: Math.random() * 100,
        status: Math.random() > 0.05 ? 'safe' : 'risk',
        weight: 15
      }
    ];

    // Liquidity Health Analysis (25%)
    const liquidityMetrics: AnalysisMetric[] = [
      {
        name: 'Liquidity Pool Lock',
        abbreviation: 'LPL',
        description: 'Whether LP tokens are locked or burned to prevent rugpulls',
        value: tokenData.symbol === 'SUI' ? 95 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.3 ? 'safe' : 'warning',
        weight: 30
      },
      {
        name: 'Liquidity Depth',
        abbreviation: 'LD',
        description: 'Total liquidity available for trading (minimum $10K recommended)',
        value: Math.random() * 100,
        status: Math.random() > 0.2 ? 'safe' : 'warning',
        weight: 25
      },
      {
        name: 'Deployer LP Control',
        abbreviation: 'DLC',
        description: 'Percentage of LP tokens controlled by deployer wallet',
        value: Math.random() * 100,
        status: Math.random() > 0.4 ? 'safe' : 'warning',
        weight: 25
      },
      {
        name: 'Pool Age',
        abbreviation: 'PA',
        description: 'How long the liquidity pool has existed (newer = riskier)',
        value: tokenData.symbol === 'SUI' ? 100 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.3 ? 'safe' : 'warning',
        weight: 20
      }
    ];

    // Holder Distribution Analysis (20%)
    const holderMetrics: AnalysisMetric[] = [
      {
        name: 'Top Holders Concentration',
        abbreviation: 'THC',
        description: 'Percentage of tokens held by top 10 wallets (>50% = high risk)',
        value: tokenData.symbol === 'SUI' ? 75 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.3 ? 'safe' : 'warning',
        weight: 30
      },
      {
        name: 'Deployer Activity',
        abbreviation: 'DA',
        description: 'Frequency and pattern of deployer wallet transactions',
        value: Math.random() * 100,
        status: Math.random() > 0.25 ? 'safe' : 'warning',
        weight: 25
      },
      {
        name: 'Whale Detection',
        abbreviation: 'WD',
        description: 'Detection of large holders or bot activity patterns',
        value: Math.random() * 100,
        status: Math.random() > 0.2 ? 'safe' : 'warning',
        weight: 25
      },
      {
        name: 'Holder Diversity',
        abbreviation: 'HD',
        description: 'Distribution of tokens across unique wallet addresses',
        value: tokenData.symbol === 'SUI' ? 85 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.3 ? 'safe' : 'warning',
        weight: 20
      }
    ];

    // Community Signals Analysis (15%)
    const communityMetrics: AnalysisMetric[] = [
      {
        name: 'Social Media Presence',
        abbreviation: 'SMP',
        description: 'Verified presence on Twitter, Telegram, Discord platforms',
        value: tokenData.symbol === 'SUI' ? 95 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.4 ? 'safe' : 'warning',
        weight: 25
      },
      {
        name: 'Engagement Quality',
        abbreviation: 'EQ',
        description: 'Ratio of real engagement vs potential bot activity',
        value: Math.random() * 100,
        status: Math.random() > 0.3 ? 'safe' : 'warning',
        weight: 25
      },
      {
        name: 'On-Chain Activity',
        abbreviation: 'OCA',
        description: 'Growth in unique users and contract interactions',
        value: tokenData.symbol === 'SUI' ? 90 : Math.random() * 100,
        status: tokenData.symbol === 'SUI' ? 'safe' : Math.random() > 0.35 ? 'safe' : 'warning',
        weight: 30
      },
      {
        name: 'Market Mentions',
        abbreviation: 'MM',
        description: 'Frequency of organic mentions across crypto forums and news',
        value: Math.random() * 100,
        status: Math.random() > 0.3 ? 'safe' : 'warning',
        weight: 20
      }
    ];

    const calculateCategoryScore = (metrics: AnalysisMetric[]): number => {
      const weightedSum = metrics.reduce((sum, metric) => {
        const score = metric.status === 'safe' ? 1.0 : metric.status === 'warning' ? 0.5 : 0.0;
        return sum + (score * metric.weight);
      }, 0);
      const totalWeight = metrics.reduce((sum, metric) => sum + metric.weight, 0);
      return (weightedSum / totalWeight) * 100;
    };

    const categories: AnalysisCategory[] = [
      {
        name: 'Smart Contract Behavior',
        abbreviation: 'SCB',
        description: 'Analysis of contract code for malicious patterns and owner privileges',
        metrics: smartContractMetrics,
        score: calculateCategoryScore(smartContractMetrics),
        weight: 40
      },
      {
        name: 'Liquidity Health',
        abbreviation: 'LH',
        description: 'Assessment of liquidity pool security and depth',
        metrics: liquidityMetrics,
        score: calculateCategoryScore(liquidityMetrics),
        weight: 25
      },
      {
        name: 'Holder Distribution',
        abbreviation: 'HD',
        description: 'Analysis of token distribution and whale concentration',
        metrics: holderMetrics,
        score: calculateCategoryScore(holderMetrics),
        weight: 20
      },
      {
        name: 'Community Signals',
        abbreviation: 'CS',
        description: 'Evaluation of community engagement and social presence',
        metrics: communityMetrics,
        score: calculateCategoryScore(communityMetrics),
        weight: 15
      }
    ];

    // Calculate overall trust score
    const trustScore = categories.reduce((sum, category) => {
      return sum + (category.score * category.weight / 100);
    }, 0);

    const riskLevel: 'low' | 'medium' | 'high' = trustScore >= 80 ? 'low' : trustScore >= 50 ? 'medium' : 'high';

    // Generate recommendations
    const recommendations: string[] = [];
    categories.forEach(category => {
      category.metrics.forEach(metric => {
        if (metric.status === 'risk') {
          recommendations.push(`Critical: Address ${metric.name} issues immediately`);
        } else if (metric.status === 'warning') {
          recommendations.push(`Caution: Monitor ${metric.name} closely`);
        }
      });
    });

    if (recommendations.length === 0) {
      recommendations.push('Token shows strong fundamentals across all metrics');
      recommendations.push('Continue monitoring for any changes in risk profile');
    }

    return {
      token: tokenData,
      trustScore: Math.round(trustScore),
      riskLevel,
      categories,
      lastUpdated: new Date(),
      recommendations
    };
  };

  const analyzeToken = useCallback(async (tokenData: Token) => {
    if (!tokenData) return;
    
    setLoading(true);
    try {
      const analysisResult = await generateAnalysis(tokenData);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      analyzeToken(token);
    } else {
      setAnalysis(null);
    }
  }, [token, analyzeToken]);

  return { analysis, loading, analyzeToken };
};