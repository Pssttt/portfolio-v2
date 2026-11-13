export type Story = {
  where: string;
  title: string;
  stat: string;
  unit: string;
  story: string;
  status: string;
};

export const stories: Story[] = [
  {
    where: "social.plus",
    title: "A stream that scaled up with no traffic",
    stat: "6.5M",
    unit: "records in the load test",
    story:
      "I built shard autoscaling for Kinesis with CloudWatch, EventBridge and Lambda, all in Terraform. During a 6.5M-record load test, an idle stream added a shard on its own. Idle streams stop publishing metrics, so the alarm kept reading an old peak. A freshness check on the metric fixed it.",
    status: "Live on staging since July 2026. Off in production for now.",
  },
  {
    where: "social.plus",
    title: "Nine places the docs disagreed with the servers",
    stat: "0",
    unit: "changes to live servers",
    story:
      "Our MQTT brokers were built by hand. Before bringing them under Terraform I compared the docs with what was actually running and found 9 mismatches. I wrote the config to match reality, so the import planned zero changes to live servers.",
    status: "Staging is adopted. The 7-node production change is an open PR.",
  },
  {
    where: "Homelab",
    title: "Every app could skip the login page",
    stat: "15",
    unit: "hostnames closed",
    story:
      "Cloudflare Access sat in front of my apps, but the origin answered anyone who found it. An IP allowlist could not work, because kube-proxy rewrote the source address. I moved traffic to an in-cluster Cloudflare Tunnel with 2 replicas and dropped everything else at the firewall.",
    status: "Closed for all 15 hostnames.",
  },
  {
    where: "VPN",
    title: "DNS requests that quietly vanished",
    stat: "10+",
    unit: "people on the VPN",
    story:
      "People on my VPN kept losing DNS lookups. I backported a fix from the upstream Outline server, wrote my own NAT patch, and added regression tests for both, then built it for ARM.",
    status: "In use by 10+ people.",
  },
  {
    where: "Unishare",
    title: "A notes site students actually use",
    stat: "40-50",
    unit: "students using it",
    story:
      "An open-source notes platform for my faculty, built with NestJS and pgvector. I wrote 1,256 of its 1,735 commits, and it signs in through the same OIDC service as two of my other apps.",
    status: "40 to 50 students use it.",
  },
];

export const links = {
  email: "me@psstee.me",
  github: "https://github.com/Pssttt",
  linkedin: "https://www.linkedin.com/in/pssteee/",
  resume: "/resume.pdf",
  terminal: "https://terminal.psstee.me",
};
