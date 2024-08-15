namespace InformationManagment.Core.Models
{
    public class MenuDto
    {
        public int Id { get; set; }
        public string MenuName { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public int OrderNo { get; set; }
        public int? ParentId { get; set; }
        public bool IsParent { get; set; }
    }
}
