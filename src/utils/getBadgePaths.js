export function getBadgePaths(rank) {
  return {
    newcomer: "src/img/newcomer.png",
    civicEnthusiast: "src/img/civicEnthusiastBadge.png",
    communitySupporter: "src/img/communitySupporterBadge.png",
    communityAdvocate: "src/img/communityAdvocateBadge.png",
    outreachGuardian: "src/img/outreachGuardianBadge.png",
    neighbourhoodLuminary: "src/img/neighbourhoodLuminaryBadge.png",
    arbiterOfEmpowerment: "src/img/arbiterOfEmpowermentBadge.png",
    impactCatalyst: "src/img/impactCatalystBadge.png",
    pillaroftheCommunity: "src/img/pillaroftheCommunityBadge.png",
    communityAmbassador: "src/img/communityAmbassadorBadge.png",
  }[rank];
}
