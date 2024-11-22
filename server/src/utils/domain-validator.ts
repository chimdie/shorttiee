import dns from "dns/promises";

export async function domainValidator(domain: string) {
  const resolver = new dns.Resolver();
  const servers = resolver.getServers();
  servers.push("4.4.4.4");
  resolver.setServers(servers);

  try {
    const res = await resolver.resolve4(domain);
    return [null, res] as const;
  } catch (e) {
    return [e as Error] as const;
  }
}
