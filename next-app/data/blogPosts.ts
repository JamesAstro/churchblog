export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime?: string;
  category: string;
  coverImage: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Walking in Faith Through Life's Storms",
    slug: "walking-in-the-faith",
    excerpt:
      "Discover how to hold onto God's promises when facing trials and tribulations in your daily walk.",
    content: `
# Walking in Faith Through Life's Storms

In times of uncertainty and struggle, our faith becomes our anchor. The Bible reminds us that trials are not meant to break us, but to strengthen our relationship with God and deepen our trust in His perfect plan.

## Understanding God's Purpose in Trials

When storms arise in our lives, it can be easy to question God's presence. Yet Scripture tells us that He never leaves nor forsakes us. James 1:2-4 encourages us to "consider it pure joy... whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance."

> "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." — Jeremiah 29:11

## Practical Steps for Strengthening Your Faith

### 1. Immerse Yourself in Scripture

God's Word is our lamp and our light. During difficult seasons, spending time in the Bible provides comfort, guidance, and reminders of God's faithfulness throughout history.

### 2. Maintain a Prayer Life

Prayer is our direct line to the Father. Pour out your heart to Him, bring your concerns, and listen for His still, small voice. He hears every prayer.

### 3. Stay Connected to Your Church Family

We were not meant to walk this journey alone. Lean on your brothers and sisters in Christ. Allow them to pray with you, encourage you, and carry your burdens alongside you.

## The Promise of Peace

Jesus said, "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." (John 14:27)

When we anchor ourselves in Christ, we find a peace that surpasses all understanding—a peace that carries us through every storm and leads us to calmer waters.
    `,
    author: "Pastor James Williams",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "December 3, 2024",
    readTime: "6 min read",
    category: "Faith",
    coverImage:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=500&fit=crop",
    tags: ["faith", "trials", "prayer", "trust"],
  },
  {
    id: "2",
    title: "The Power of Community in the Body of Christ",
    slug: "the-power-of-community",
    excerpt:
      "Why gathering together matters and how to build meaningful connections within your church family.",
    content: `
# The Power of Community in the Body of Christ

Hebrews 10:25 urges us not to give up meeting together. But why is community so essential to our spiritual growth? The answer lies in God's design for His church—a body made up of many members, each with unique gifts and purposes.

## We Are Stronger Together

Scripture consistently emphasizes the importance of fellowship. Ecclesiastes 4:9-10 tells us, "Two are better than one... If either of them falls down, one can help the other up."

### The Early Church Model

The believers in Acts devoted themselves to the apostles' teaching, fellowship, breaking of bread, and prayer. They shared everything they had and met together daily. The result? The Lord added to their number daily those who were being saved.

## Building Authentic Connections

### Small Groups and Bible Studies

Large Sunday gatherings are wonderful for worship, but deeper connections often form in smaller settings. Consider joining or starting a small group where you can study Scripture together and share life's joys and challenges.

### Serving Together

There's something special about working alongside fellow believers. Whether it's serving in the children's ministry, greeting newcomers, or participating in outreach, serving together builds bonds that last.

> "For where two or three gather in my name, there am I with them." — Matthew 18:20

## The Blessing of Accountability

Iron sharpens iron. Having brothers and sisters who know you, pray for you, and lovingly hold you accountable is one of God's greatest gifts to believers. Don't walk alone—embrace the community God has placed you in.
    `,
    author: "Sister Mary Thompson",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    date: "December 1, 2024",
    readTime: "7 min read",
    category: "Community",
    coverImage:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=500&fit=crop",
    tags: ["community", "fellowship", "church", "small groups"],
  },
  {
    id: "3",
    title: "Raising Children in Faith: A Parent's Guide",
    slug: "raising-children-in-faith",
    excerpt:
      "Practical wisdom for nurturing your children's spiritual growth and passing on your faith to the next generation.",
    content: `
# Raising Children in Faith: A Parent's Guide

Deuteronomy 6:6-7 instructs parents: "These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road."

## Starting from the Heart

Children are incredibly perceptive. Before we can teach them about God's love, they need to see it lived out in our own lives. Our relationship with the Lord sets the foundation for theirs.

### Making Faith Practical

- **Morning prayers** together as a family
- **Bedtime devotions** with age-appropriate Bible stories
- **Mealtime blessings** that acknowledge God's provision
- **Discussion** of how faith applies to daily situations

## Age-Appropriate Discipleship

### Toddlers and Preschoolers

Use simple songs, colorful Bible storybooks, and hands-on activities. Children at this age learn through repetition and experience. Make church and prayer a natural, joyful part of their routine.

### Elementary Age

Begin to explore deeper Bible stories and discuss their meanings. Encourage questions and provide honest, age-appropriate answers. This is a wonderful time to memorize Scripture together.

### Teenagers

Give them space to own their faith. Encourage them to ask hard questions and explore their beliefs. Connect them with youth groups and mentors who can walk alongside them.

> "Train up a child in the way he should go; even when he is old he will not depart from it." — Proverbs 22:6

## The Long View

Planting seeds of faith is a long-term investment. Some seeds bloom quickly; others take years. Trust that God is at work, even when you cannot see the fruit. Keep praying, keep modeling, keep loving.
    `,
    author: "Deacon Robert & Lisa Chen",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    date: "November 28, 2024",
    readTime: "8 min read",
    category: "Family",
    coverImage:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop",
    tags: ["parenting", "family", "discipleship", "children"],
  },
  {
    id: "4",
    title: "The Heart of Worship: More Than Just Singing",
    slug: "the-heart-of-worship",
    excerpt:
      "Understanding what it truly means to worship God in spirit and in truth every day of the week.",
    content: `
# The Heart of Worship: More Than Just Singing

When Jesus spoke with the Samaritan woman at the well, He revealed something profound: "True worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks." (John 4:23)

## Beyond Sunday Morning

While corporate worship on Sundays is vital, worship is meant to be a lifestyle. Romans 12:1 calls us to "offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship."

### Worship in Daily Life

Every act of obedience, every moment of gratitude, every choice to love can be an act of worship. When we work with integrity, serve others selflessly, and speak words of life, we glorify God.

## Elements of True Worship

### Humility

Worship begins with recognizing who God is and who we are in relation to Him. It's coming before the King of Kings with hearts bowed low, acknowledging His sovereignty and grace.

### Gratitude

A thankful heart is a worshiping heart. Psalm 100:4 instructs us to "enter his gates with thanksgiving and his courts with praise."

### Surrender

True worship requires surrender—laying down our will, our plans, our desires at the foot of the cross and saying, "Not my will, but Yours be done."

> "Shout for joy to the Lord, all the earth. Worship the Lord with gladness; come before him with joyful songs." — Psalm 100:1-2

## Cultivating a Worshipful Heart

Make praise a habit. Start each day by acknowledging God's goodness. End each day by thanking Him for His faithfulness. Let worship flow naturally from a heart that is continually aware of His presence.
    `,
    author: "Minister Sarah Johnson",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    date: "November 25, 2024",
    readTime: "6 min read",
    category: "Community",
    coverImage:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=500&fit=crop",
    tags: ["worship", "praise", "spiritual life", "devotion"],
  },
  {
    id: "5",
    title: "Serving Others: Living Out the Gospel",
    slug: "serving-others-living",
    excerpt:
      "Practical ways to put your faith into action and be the hands and feet of Jesus in your community.",
    content: `
# Serving Others: Living Out the Gospel

James 2:17 reminds us that "faith by itself, if it is not accompanied by action, is dead." As followers of Christ, we are called not only to believe but to act—to love our neighbors in tangible, practical ways.

## Following Jesus' Example

Jesus, though He was God, came to serve, not to be served. He washed His disciples' feet, healed the sick, fed the hungry, and welcomed the outcast. He calls us to do the same.

> "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many." — Mark 10:45

## Opportunities to Serve

### Within the Church

- Volunteer in children's ministry or youth programs
- Join the hospitality team to welcome newcomers
- Participate in worship or tech ministries
- Support administrative needs behind the scenes

### In the Community

- Volunteer at local food banks or homeless shelters
- Visit nursing homes and bring fellowship to the elderly
- Mentor young people in schools or community centers
- Participate in neighborhood cleanup and improvement projects

### Global Missions

Consider supporting missionaries financially or through prayer. If God calls you, explore short-term or long-term mission opportunities to share the Gospel with unreached peoples.

## The Joy of Service

There is profound joy in serving others. When we step outside ourselves and meet the needs of those around us, we experience the heart of God in a deeper way. Service is not a burden—it's a privilege and a blessing.

Start small. Look around you. Who needs encouragement today? Who needs a helping hand? Be intentional, be available, and watch God work through you.
    `,
    author: "Elder David Martinez",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    date: "November 20, 2024",
    readTime: "7 min read",
    category: "Service",
    coverImage:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=500&fit=crop",
    tags: ["service", "missions", "outreach", "community"],
  },
  {
    id: "6",
    title: "Finding Peace Through Prayer and Meditation",
    slug: "finding-peace-through-prayer",
    excerpt:
      "How to develop a deeper prayer life and experience God's presence in the stillness of your heart.",
    content: `
# Finding Peace Through Prayer and Meditation

In our busy, noisy world, finding moments of stillness can feel impossible. Yet God invites us to be still and know that He is God. Through prayer and meditation on His Word, we find the peace our souls desperately need.

## The Invitation to Rest

"Come to me, all you who are weary and burdened, and I will give you rest." (Matthew 11:28) Jesus offers rest to those who come to Him. Prayer is the pathway to that rest.

### Different Forms of Prayer

- **Adoration**: Praising God for who He is
- **Confession**: Acknowledging our sins and receiving forgiveness
- **Thanksgiving**: Expressing gratitude for God's blessings
- **Supplication**: Bringing our requests before Him

## Meditation on Scripture

Biblical meditation is not emptying the mind but filling it with God's truth. Choose a verse, read it slowly, and reflect on its meaning. Ask the Holy Spirit to reveal its application to your life.

### Practical Tips

1. **Set aside dedicated time** each day for prayer and reading
2. **Find a quiet place** where you can focus without distraction
3. **Use a journal** to record insights and prayers
4. **Start small** and gradually increase your time with God

> "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." — Psalm 46:10

## The Fruit of Stillness

When we consistently spend time in God's presence, we begin to experience transformation. Anxiety gives way to peace. Fear is replaced by trust. We become more like Jesus—patient, loving, and grounded in truth.

Make time for God today. He is waiting to meet with you.
    `,
    author: "Sister Grace Kim",
    authorAvatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
    date: "November 15, 2024",
    readTime: "6 min read",
    category: "Prayer",
    coverImage:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=500&fit=crop",
    tags: ["prayer", "meditation", "peace", "spiritual growth"],
  },
];

// export const categories = [...new Set(blogPosts.map((post) => post.category))];
export const categories = [
  { title: "Faith", value: "faith" },
  { title: "Community", value: "community" },
  { title: "Family", value: "family" },
  { title: "Worship", value: "worship" },
  { title: "Service", value: "service" },
  { title: "Events", value: "events" },
  { title: "Bible Study", value: "bible-study" },
  { title: "Announcements", value: "announcements" },
];

export const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))];
